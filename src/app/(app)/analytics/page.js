import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LazyChart } from "@/components/LazyComponents";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { faLink, faChartLine, faEye, faMousePointer, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isToday } from "date-fns";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  // Connect to MongoDB
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  // Get session
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/');
  }

  // Find page by user email
  const page = await Page.findOne({ owner: session.user.email });
  if (!page) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-8 text-center max-w-md">
          <FontAwesomeIcon icon={faChartLine} className="text-6xl text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">No Analytics Available</h2>
          <p className="text-gray-600">Create your page first in the Dashboard to start tracking analytics.</p>
        </div>
      </div>
    );
  }

  // Aggregate views by date
  const groupedViews = await Event.aggregate([
    {
      $match: {
        type: 'view',
        uri: page.uri,
      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d"
          },
        },
        count: { $sum: 1 } // Changed from "$count" to "$sum: 1" to correctly count documents
      },
    },
    { $sort: { _id: 1 } }
  ]);

  // Find clicks
  const clicks = await Event.find({
    page: page.uri,
    type: 'click',
  });

  // Calculate total views and clicks
  const totalViews = groupedViews.reduce((sum, view) => sum + view.count, 0);
  const totalClicks = clicks.length;
  const todayViews = groupedViews.filter(view => view._id === new Date().toISOString().split('T')[0])[0]?.count || 0;
  const todayClicks = clicks.filter(click => isToday(click.createdAt)).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-3 sm:px-4 md:px-6 py-4 sm:py-6">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 gap-3 sm:gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FontAwesomeIcon icon={faChartLine} className="text-xl sm:text-2xl text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Track your Mero Link performance and engagement</p>
            </div>
          </div>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Views</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{totalViews}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faEye} className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-green-100 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Clicks</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{totalClicks}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faMousePointer} className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-purple-100 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Today's Views</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600">{todayViews}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faCalendarDay} className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-orange-100 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Today's Clicks</p>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">{todayClicks}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FontAwesomeIcon icon={faMousePointer} className="text-orange-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Views Section */}
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center">
              <FontAwesomeIcon icon={faEye} className="mr-3" />
              Page Views Over Time
            </h2>
          </div>
          <div className="p-3 sm:p-6">
            <LazyChart data={groupedViews.map(o => ({
              date: o._id,
              views: o.count,
            }))} />
          </div>
        </div>

        {/* Enhanced Clicks Section */}
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white flex items-center">
              <FontAwesomeIcon icon={faMousePointer} className="mr-3" />
              Link Performance
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            {page.links && page.links.length > 0 ? (
              <div className="space-y-4">
                {page.links.map((link, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <FontAwesomeIcon icon={faLink} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{link.title || 'Untitled Link'}</h3>
                          <p className="text-gray-600 text-sm">{link.subtitle || 'No description'}</p>
                          <a 
                            className="text-blue-500 text-sm hover:text-blue-700 transition-colors break-all" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            href={link.url}
                          >
                            {link.url}
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <div className="bg-white border-2 border-blue-200 rounded-lg p-3 text-center min-w-[80px]">
                          <div className="text-2xl font-bold text-blue-600">
                            {clicks.filter(c => c.uri === link.url && isToday(c.createdAt)).length}
                          </div>
                          <div className="text-gray-500 text-xs font-medium uppercase">Today</div>
                        </div>
                        <div className="bg-white border-2 border-green-200 rounded-lg p-3 text-center min-w-[80px]">
                          <div className="text-2xl font-bold text-green-600">
                            {clicks.filter(c => c.uri === link.url).length}
                          </div>
                          <div className="text-gray-500 text-xs font-medium uppercase">Total</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FontAwesomeIcon icon={faLink} className="text-6xl text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Links Added</h3>
                <p className="text-gray-500">Add some links to your page to start tracking clicks!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

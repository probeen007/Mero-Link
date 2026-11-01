import HeroForm from "@/components/forms/HeroForm";
import InteractiveBackground from "@/components/InteractiveBackground";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette, faPlay, faChartBar, faBolt, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faInstagram, faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Beautiful Themes",
      description: "Choose from dozens of stunning designs or build your own. Customize colors, fonts, and buttons to match your brand.",
      icon: faPalette,
      color: "text-blue-600 bg-blue-50 border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600",
    },
    {
      title: "Video & Music Embeds",
      description: "Add YouTube videos, Spotify tracks, or TikToks directly to your page. Visitors can play them instantly without leaving.",
      icon: faPlay,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600",
    },
    {
      title: "Simple Analytics",
      description: "See how many people visit your page and click your links. Friendly charts help you track what works best.",
      icon: faChartBar,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600",
    },
    {
      title: "Lightning Fast",
      description: "Your page loads in the blink of an eye on any phone or computer. No waiting, no loading screens.",
      icon: faBolt,
      color: "text-amber-600 bg-amber-50 border-amber-100 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Claim your name",
      description: "Secure your unique web handle and generate your clean, lightning-fast root URL.",
    },
    {
      number: "02",
      title: "Unify your assets",
      description: "Collect your social networks, custom website projects, and YouTube embeds in one page.",
    },
    {
      number: "03",
      title: "Go live instantly",
      description: "Publish your customized design theme and start sharing your link in your bio.",
    },
  ];

  return (
    <div className="relative isolate min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Interactive Animated Background */}
      <InteractiveBackground />

      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="pt-8 sm:pt-16 lg:pt-24 pb-16 sm:pb-24">
          <div className="page-shell">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              
              {/* Left Column (Hero Copy) */}
              <div className="flex-1 text-center lg:text-left space-y-6 sm:space-y-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900 opacity-0 animate-fadeIn">
                  Your entire online presence, <span className="bg-gradient-to-r from-blue-600 via-indigo-650 via-purple-650 to-blue-650 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">in one link.</span>
                </h1>

                <p className="text-slate-650 text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-0 animate-fadeInDelay font-medium text-slate-600">
                  Stop scattering your followers. Unify your social handles, case studies, galleries, and videos onto a single, high-fidelity landing page.
                </p>

                <div className="flex justify-center lg:justify-start opacity-0 animate-fadeInDelay2 pt-1">
                  <HeroForm />
                </div>
              </div>

              {/* Right Column (3D Realistic Mobile Phone with visual anchor orbs) */}
              <div className="flex-1 flex justify-center items-center opacity-0 animate-fadeInDelay2 [perspective:1000px] py-4 relative">
                
                {/* Visual anchor glowing orb in the background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-500/25 rounded-full blur-3xl -z-10 animate-pulse duration-5000" />
                
                <div className="relative w-[310px] h-[610px] rounded-[52px] border-[10px] border-slate-900 bg-slate-950 shadow-[0_25px_60px_rgba(0,0,0,0.35)] animate-float3D flex flex-col p-3.5 select-none">
                  
                  {/* Speaker Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-950 rounded-b-xl z-20 flex items-center justify-center">
                    <div className="w-12 h-1 bg-slate-800 rounded-full" />
                  </div>

                  {/* Volume buttons (left side) */}
                  <div className="absolute top-24 -left-[14px] w-[4px] h-12 bg-slate-800 rounded-l-md" />
                  <div className="absolute top-40 -left-[14px] w-[4px] h-12 bg-slate-800 rounded-l-md" />
                  
                  {/* Power button (right side) */}
                  <div className="absolute top-28 -right-[14px] w-[4px] h-16 bg-slate-800 rounded-r-md" />

                  {/* Glass Glossy reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none rounded-[42px] z-30" />
                  
                  {/* Inner Page Layout */}
                  <div className="w-full h-full rounded-[38px] overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 flex flex-col justify-between p-4 pt-10 border border-slate-800/40">
                    
                    <div className="flex flex-col items-center w-full text-center">
                      {/* Avatar Image */}
                      <div className="w-16 h-16 rounded-full border-2 border-white/20 overflow-hidden shadow-md">
                        <img 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80" 
                          alt="Creator Avatar" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      {/* Name & Checkmark */}
                      <h4 className="mt-2 text-white font-bold text-sm flex items-center gap-1">
                        Sarah Jenkins
                        <FontAwesomeIcon icon={faCircleCheck} className="text-blue-400 text-xs shrink-0 animate-pulse" />
                      </h4>
                      <p className="text-white/60 text-[10px] mt-0.5 font-medium">Visual Designer & Photographer</p>
                      
                      {/* Social Brand Icons */}
                      <div className="flex gap-3 mt-3">
                        <a href="#" className="w-6.5 h-6.5 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all text-xs">
                          <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="#" className="w-6.5 h-6.5 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all text-xs">
                          <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="#" className="w-6.5 h-6.5 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all text-xs">
                          <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a href="#" className="w-6.5 h-6.5 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all text-xs">
                          <FontAwesomeIcon icon={faYoutube} />
                        </a>
                      </div>
                    </div>
                    
                    {/* Mock Links & Video Embed */}
                    <div className="w-full space-y-2.5 flex-grow flex flex-col justify-center my-3">
                      {/* Premium high-contrast solid buttons */}
                      <div className="w-full py-2.5 bg-white text-slate-950 text-xs font-bold rounded-xl text-center shadow-md hover:bg-slate-50 transition-all cursor-pointer">
                        Latest Work Case Study
                      </div>
                      
                      <div className="w-full py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl text-center shadow-md hover:bg-blue-700 transition-all cursor-pointer">
                        Design Assets Store
                      </div>

                      {/* Mock YouTube Video Embed Card */}
                      <div className="w-full rounded-xl bg-slate-900/90 border border-white/10 overflow-hidden shadow-md flex flex-col">
                        <div className="relative aspect-video w-full">
                          <img 
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=350&q=80" 
                            alt="Mock video preview" 
                            className="w-full h-full object-cover brightness-95" 
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/45 transition-colors cursor-pointer">
                            <span className="w-8 h-8 rounded-full bg-white/95 text-slate-900 flex items-center justify-center shadow text-[10px] font-bold">
                              ▶
                            </span>
                          </div>
                        </div>
                        <div className="p-2 text-left">
                          <span className="text-[10px] text-white/90 font-bold block truncate">Design Workflow Redesign</span>
                          <span className="text-[8px] text-white/40 block mt-0.5">YouTube — 12 mins watch</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-[9px] text-white/20 text-center tracking-wider font-semibold">Powered by Mero Link</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Features Showcase Section */}
        <section className="py-16 sm:py-24 bg-white border-y border-slate-100">
          <div className="page-shell">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-2xl sm:text-3.5xl font-extrabold text-slate-900 tracking-tight">
                Designed for optimal conversion
              </h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base font-medium">
                Keep visitors engaged with page designs tuned for high speed and clear focus.
              </p>
            </div>

            {/* Immersive interactive cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {features.map((feat) => (
                <div 
                  key={feat.title} 
                  className="group bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 hover:border-blue-500/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.06)] transition-all duration-300 ease-out"
                >
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl border mb-5 transition-all duration-300 ${feat.color}`}>
                    <FontAwesomeIcon icon={feat.icon} className="text-base group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {feat.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm font-medium">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Steps Section */}
        <section className="py-16 sm:py-24">
          <div className="page-shell">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-2xl sm:text-3.5xl font-extrabold text-slate-900 tracking-tight">
                Get online in three steps
              </h2>
              <p className="mt-3 text-slate-600 text-sm font-medium">
                Setup is simple, quick, and completely frictionless.
              </p>
            </div>

            {/* Animated Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {steps.map((step) => (
                <div 
                  key={step.number} 
                  className="group relative bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 flex flex-col justify-between hover:border-blue-500/30 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(59,130,246,0.04)] transition-all duration-300 ease-out"
                >
                  <div className="text-4xl font-extrabold text-slate-200/40 group-hover:text-blue-500/10 absolute -top-4 right-6 select-none transition-colors duration-300">
                    {step.number}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-slate-650 leading-relaxed text-xs sm:text-sm font-medium text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Callout Banner Section */}
        <section className="pb-16 sm:pb-24">
          <div className="page-shell">
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 sm:p-12 overflow-hidden shadow-xl text-center border border-slate-800">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-500/15 via-transparent to-transparent pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Start your page today
                </h2>
                <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto font-medium">
                  Create a beautifully responsive link page and elevate your brand image.
                </p>
                <div className="pt-2 flex justify-center">
                  <Link 
                    href="/login" 
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white hover:text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
                  >
                    Get Started Free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

import React from 'react'
import Link from 'next/link';

const FourumCard = ({ projects, onHover, onLeave }) => {
  return (
    <article className="flex flex-col h-[450px] w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300">
      
      {/* Top Section */}
      <div className="flex items-start justify-between p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              alt="User"
              src="https://scontent.fknu1-6.fna.fbcdn.net/v/t39.30808-1/334998150_2915813855229526_2877140648363160727_n.jpg?stp=c74.0.790.790a_dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_ohc=98eOaJc3IG0Q7kNvwEXIXGG&_nc_oc=AdnJ0KvCLq_iSQaCG4fMC0yhWMoFIROUq9yaw8n-TTyZT8fJmtz3eyzYWE5uAJWI-pE&_nc_zt=24&_nc_ht=scontent.fknu1-6.fna&_nc_gid=IE3IqhWUMBEpgP86IewrWw&oh=00_AfoVkF9Ja5nhaqMX67heagOlg0c-GZ-20xDLTBt8sj70wA&oe=697E2A45"
              className="size-10 rounded-xl object-cover ring-2 ring-gray-50"
            />
            <span className="absolute -bottom-1 -right-1 block size-3 rounded-full border-2 border-white bg-green-500"></span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</span>
            <span className="text-sm font-bold text-gray-900">Available for work</span>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-green-700 ring-1 ring-inset ring-green-600/10">
          <span className="text-[10px] font-bold uppercase tracking-tight">Active Projects</span>
        </span>
      </div>

      {/* Projects List Section */}
      <div className="flex-1 px-4 overflow-y-auto">
        <div className="space-y-1">
          {projects.map((project) => (
            <div
              key={project.id}
              onMouseEnter={() => onHover(project)}
              onMouseLeave={onLeave}
              className="group flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer hover:bg-zinc-50 border border-transparent hover:border-zinc-100"
            >
              <div className="flex flex-col">
                <h4 className="text-sm font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                  {project.name}
                </h4>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
                  {project.title}
                </span>
              </div>
              <span className="text-gray-300 group-hover:text-green-600 transition-all transform group-hover:translate-x-1">→</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-gray-50 bg-gray-50/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
            </svg>
            <span className="text-xs font-bold uppercase">Chat with me</span>
          </div>
          <Link href="mailto:patelabhay550@gmail.com" className="text-xs font-extrabold text-green-600 hover:text-green-800 uppercase tracking-widest">
            CONTACT ME →
          </Link>
        </div>
      </div>
    </article>
  )
}

export default FourumCard
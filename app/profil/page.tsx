import Image from "next/image";
import Link from "next/link";

export default function profil() {
  return (
   <>
  <div className="w-screen h-screen bg-transparent flex items-center justify-center">
    <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover"
    >
      <source src="/asio.mp4" type="video/mp4" />
    </video>
  </div>
  {/* Grand div principal */}
  <div className="w-full max-w-6xl mx-auto px-6 bg-transparent p-6 rounded-lg 
                  relative h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] flex flex-col">
    
    {/* Contenu */}
         {/* Vidéo en arrière-plan */}
      
    <div className="flex flex-col items-center justify-center flex-grow relative w-full h-full">
  {/* Conteneur pour la vidéo avec border-radius */}
  

  {/* Contenu au-dessus de la vidéo */}
      <div className="relative z-10 p-6 rounded-lg 
                  w-[90%] max-w-md 
                  bg-white/20 backdrop-blur-md
                  flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Profil</h1>
          <Link 
            href="/" 
            className="px-4 py-2 rounded-md bg-[#2AFAB2] hover:bg-[#22c49c] text-white font-semibold shadow-md"
          >
            Accueil
          </Link>
      </div>
    </div>
  </div>
</div>

</>

  );
}
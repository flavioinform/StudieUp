import logoMob from "@/assets/logo/logoMob.png"

const Footer = () => {
  return (
    <footer id="footer" className="bg-[#0F172A] py-14">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src={logoMob} alt="StudieUp Logo" className="w-6 h-6 rounded-md object-contain" />
          <span className="text-white font-bold text-sm">StudieUp</span>
        </div>

        <div className="flex items-center gap-6">
          {["Privacidad", "Términos", "Soporte", "Blog"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} StudieUp. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
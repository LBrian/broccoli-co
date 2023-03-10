function Header() {
  return (
    <div className='btm-nav-lg short:btm-nav-sm navbar bg-secondary text-secondary-content text-2xl short:text-xl font-bold sticky top-0 z-10'>
      <div className='px-4'>{document.title}</div>
    </div>
  )
}

export default Header

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className='footer footer-center p-10 short:p-4 bg-secondary text-secondary-content sticky bottom-0 z-10'>
      <div>
        <p className='font-bold'>
          {document.title}
          <br />
          Providing reliable tech since 1992
        </p>
        <p>Copyright © {year} - All right reserved</p>
      </div>
    </footer>
  )
}

export default Footer


export default function Panel({ children }: { children?: React.ReactNode }) {
  return (<section  className="bg-white p-[30px]">
    {children}
  </section >
  )
}
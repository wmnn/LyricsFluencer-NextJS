import Header from './Header'
  
function DefaultLayout ({ children }) {
  return (
    <>
        <Header />
        <hr />
        <div className="lg:w-[50%] lg:ml-[25%] p-8">
            {children}
        </div>
    </>
  )
};
  
export default DefaultLayout;
export const ErrorAlert = ({error}) => {

    return (
        <>
        {error ?
         <div className="error-container">
                <p>{error}</p>

            </div>
        : 
        <div>
            
        </div>
        }
   
        </>

    )
}
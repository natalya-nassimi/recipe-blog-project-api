const errorLogger =  (error)=>{
    console.log('');
    console.log('🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨');
    console.log("----------------------------------");
    console.log("Name:",  error.name || error);
    console.log("----------------------------------");
    console.log('Message:', error.message);
    console.log("----------------------------------");
    console.log("Stack:\n", error.stack)
    console.log("----------------------------------");
    console.log("This error occured on the following request:");
}

const errorHandler =  (error, req, res, next)=>{
    errorLogger(error);
    const errorResponse = {}
    if(error.code === 11000){
        const errors =  Object.entries(error.keyValue);
        errors.forEach(error => {
            const [fieldName, value] =  error
            errorResponse[fieldName] =  `${fieldName} "${value}" already taken.`
        })   
        res.status(400).json(errorResponse);
    }

    if(error.name === 'CastError' && error.kind === 'ObjectId'){
        res.status(404).json({message: 'Not found'})
    }
    
    if(error.name=== 'ValidationError'){
        const errorObjects =  Object.value(error.errors)
        console.log(errorObjects)

        errorObjects.forEach(error => {
            errorResponse[error?.properties?.path || error.path || 'fieldError']  = error?.properties.message || error.message || 'Something went wrong';
        })

        return res.status(400).json(errorResponse)
    }
    return res.status(error.status || 500).json({ message: error.message || 'Something went wrong. Please try again later.' })
}

export default errorHandler



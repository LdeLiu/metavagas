class CommonError{
    static build(message: string){
        return {
            error: true,
            message
        }
    }
}

export {CommonError}
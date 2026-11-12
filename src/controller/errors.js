const showTestErrorPage = (req, res, next) => {
    const err = new Error('This is a test error');
    console.error(err);
    
    err.status = 500;
    err.message = 'Server Error';

    const templateView = `errors/${err.status.toString()}`;

    const context = {
        title: 'Error',
        message: err.message,
        status: err.status
    };

    res.render(templateView, context);
};

export {showTestErrorPage};
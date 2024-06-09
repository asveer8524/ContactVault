const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const status = res.statusCode || 500; // Use statusCode directly, default to 500 if not set
    switch (status) {
        case constants.Bad_Request:
            res.status(status).json({
                title: "Validation Failed",
                message: err.message,
                stack: err.stack // Renamed stackTrace to stack
            });
            break;

        case constants.Not_Found:
            res.status(status).json({
                title: "Not Found",
                message: err.message,
                stack: err.stack
            });
            break;

        case constants.Method_Not_Allowed:
            res.status(status).json({
                title: "Method Not Allowed",
                message: err.message,
                stack: err.stack
            });
            break;

        case constants.Request_Timeout:
            res.status(status).json({
                title: "Request Timeout",
                message: err.message,
                stack: err.stack
            });
            break;

        case constants.Too_Many_Requests:
            res.status(status).json({
                title: "Too Many Requests",
                message: err.message,
                stack: err.stack
            });
            break;

        case constants.SERVER_ERROR:
            res.status(status).json({
                title: "SERVER ERROR",
                message: err.message,
                stack: err.stack
            });
            break;

        default:
            // Handle unexpected errors gracefully
            console.log("No Error");
            break;
    }

    next(); // Pass the error to the next error-handling middleware
};

module.exports = errorHandler;

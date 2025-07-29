// import file system pacakge
import winston from "winston";


// config winston right here

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(), // will set formet
    defaultMeta: {service: "request-logging"}, // default information (message) to every logs
    transports: [
        new winston.transports.File({filename:'logs.txt'})
    ] //will tell where to save all logs
})

const loggerMiddleware = async(req,res,next) => {
    // if url is not on signin and signup then only log data
    if (!(req.url.includes("signup"))){
        //log data
        const logData = `${req.url} - ${JSON.stringify(req.body)}`
        // calling log function with req.body
        logger.info(logData)
    };
    next();
}

export default loggerMiddleware;
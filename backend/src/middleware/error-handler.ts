import {NextFunction, Request, Response} from "express"

/**
 * Represents an asynchronous function that handles an HTTP request.
 *
 * @callback asyncFunc
 * @param {Request} req - The incoming request object.
 * @param {Response} res - The outgoing response object.
 * @param {NextFunction} next - The next function to call in the middleware chain.
 * @returns {Promise<void>} - A promise that resolves when the asynchronous operation is complete.
 */
type asyncFunc = (req: Request, res: Response, next: NextFunction) => Promise<any>

/**
 * Executes an asynchronous function and handles any errors that occur during its execution.
 *
 * @param {asyncFunc} fn - The asynchronous function to be executed.
 * @returns Express middleware function that accepts request, response, and next function parameters.
 */
export const asyncHandler = (fn: asyncFunc) => (req: Request, res: Response, next: NextFunction) =>
  Promise
    .resolve(fn(req, res, next))
    .catch(next)

/**
 * Handles errors in the application and sends an error response to the client.
 *
 * @param {Error} err - The error that occurred.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next function to call.
 * @returns {void}
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error("Error Message\n: " + err.message)
  console.error("Stack trace\n: " + err.message)
  res.status(500).send({
    error: err.message,
  })
}

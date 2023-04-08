export default class Marketing {
  update({ id, userName }) {
    /*
    its important to remember that the function [update] is responsible of
    handling his errors/exceptions

    our subject won`t have any there (or somenthing that might block any exection)
    our subjetc is the engine to send data to all observers
    */
    console.log(`[${id}] : [marketing] will send and en welcom email to [${userName}]`)
  }
}

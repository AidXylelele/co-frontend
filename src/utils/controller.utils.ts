import { AuthedSocket } from "src/types/socket.types";

export class ControllerUtils {
  shapeInput(socket: AuthedSocket, input: any = null) {
    const { email } = socket.user;
    const { transactions } = input;

    if (!input || !transactions) {
      return { email };
    }

    return { email, transactions };
  }
}

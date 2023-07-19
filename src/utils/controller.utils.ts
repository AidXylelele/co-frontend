import { ExtendedSocket } from "src/types/app.types";

export class ControllerUtils {
  shapeInput(socket: ExtendedSocket, input: any = null) {
    const { email } = socket.user;
    const { transactions } = input;

    if (!input || !transactions) {
      return { email };
    }

    return { email, transactions };
  }
}

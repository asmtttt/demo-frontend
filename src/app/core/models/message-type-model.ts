import { MessageType } from "src/app/core/enums/MessageType";

export interface ResponseMessageModel {
    messageType: MessageType;
    message: string;
}
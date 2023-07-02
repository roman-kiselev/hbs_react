interface IMessage {
    message: string;
}

interface IDataError {
    status: number | null;
    data: IMessage;
}

export default IDataError;

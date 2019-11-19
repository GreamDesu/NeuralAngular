import * as io from 'socket.io-client';
import { Observable } from 'rxjs';


export class ChatService {
    private url = 'http://localhost:3000';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }


    public getMessages = () => {
        // tslint:disable-next-line: deprecation
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
                observer.next(message);
            });
        });

    }
}
import React, { Component } from 'react';
import ApiCaller from '../../utils/api.caller';
import Features from '../Common/features';
import { Launcher } from 'react-chat-window';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageList: [{
                author: 'them',
                type: 'text',
                data: { text: `Hi ${props.name}, How may I help you` }
            }]
        };
    }
    componentDidMount(){
        this.socket = io.connect();
        this.socket.on('fromServer',(data)=> { 
            this._sendMessage(data.server)
        })
    }
    _onMessageWasSent(message) {
        this.setState({
            messageList: [...this.state.messageList, message]
        });
        this.socket.emit('fromClient', { client: message, token:  ApiCaller.token});
    }

    _sendMessage(text) {
        if (text.length > 0) {
            this.setState({
                messageList: [...this.state.messageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                }]
            })
        }
    }

    render() {
        return (


            <div className="container container-fluid">
<Features />
                <Launcher
                agentProfile={{
                    teamName: 'Live Reporting',
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}
                onMessageWasSent={this._onMessageWasSent.bind(this)}
                messageList={this.state.messageList}
            />
            </div>
        );
    }
}

export default Home;


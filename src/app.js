import React from 'react';
import ReactDOM from 'react-dom';
import validator from 'validator';

class WhatsApp extends React.Component {
    constructor(props){
        super(props);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {
            link: undefined, 
            visibility: false
        };
    }

    handleSendMessage(phone){
        if(!phone) {
            return 'Informe o telefone para enviar a mensagem.';
        }else if(!validator.isNumeric(phone)){
            return 'Insira apenas números!';
        }
        this.state.link = 'https://wa.me/55' + phone + '?text=Olá, estamos preparando o seu pedido. Qualquer dúvida ou problema, envie uma mensagem pra gente. Obrigado, DAKARA FOOD';
        this.handleToggleVisibility()
    }

    handleToggleVisibility() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            }
        });
    }


    render(){
        const subtitle = 'Mensagem para o cliente iFood!';
        return(
            <div>
                <Header subtitle={subtitle}/>
                <SendMessage
                    handleSendMessage={this.handleSendMessage}
                />
                {
                    this.state.visibility && (
                        <div>
                            <a href={this.state.link} onClick={this.handleToggleVisibility} target="_blank">Enviar mensagem</a>
                        </div>
                    )
                }
            </div>
        )
        this.setState(() => {
            visibility: false
        }) 
    }
};

const Header = (props) => {
    return (
        <div>
         <h1>{props.title}</h1>
         {props.subtitle && <h2>{props.subtitle}</h2>}
         
        </div>
    );
};

Header.defaultProps = {
    title: 'Whats App'
};


class SendMessage extends React.Component {
    constructor(props){
        super(props);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.state = {
            error: undefined
        };
    };

    handleSendMessage(e){
        e.preventDefault();

        const phone = e.target.elements.phone.value.trim();
        const error = this.props.handleSendMessage(phone);

        this.setState(() => ({ error }));

        if (!error){
            e.target.elements.phone.value = '';
        }
    }

    render(){
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleSendMessage}>
                    <input type="text" name="phone" placeholder="Telefone"/>
                    <button>Preparar</button>
                </form>
            </div>
        );
    }

};

ReactDOM.render(<WhatsApp />, document.getElementById('app'));
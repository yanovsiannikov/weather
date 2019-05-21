import React from 'react';
import './App.css'

const apiKey = 'Api key here';
const hour = new Date().getHours();

class App extends React.Component {
    state = {
        weather : {},
        loading : true,
        theme: hour > 6 ? 'day' : 'night',
    };
    async componentDidMount() {
            let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Saint+Petersburg&appid=${apiKey}`);
            data = await data.json();
            await this.setState({weather : data});
            document.body.className = this.state.theme;
            await this.setState({loading : false})
    }

    componentDidUpdate() {
        document.body.className = this.state.theme;
    }

    changeThemeHandler = () => {
        let newTheme = this.state.theme==='day' ? 'night' : 'day';
        this.setState({theme : newTheme})
    }

    render() {
        let temp, icon;
        if (!this.state.loading) {
            temp = Math.floor(this.state.weather.main.temp - 273.15);
            icon = this.state.weather.weather[0].icon;
            this.state.theme === 'night' ? icon = icon.slice(0,-1)+'n' : icon = icon.slice(0,-1)+'d';
        }

        return (
            <div className={"card "+this.state.theme} onClick={this.changeThemeHandler}>
                <div className="leftSide">
                    <img alt={this.state.theme} src={`https://openweathermap.org/img/w/${icon}.png`}/>
                </div>
                <div className="rightSide">
                    <p className="text">Санкт-Петербург</p>
                    <p className="text">{temp} °C</p>
                </div>
            </div>
      )};
}

export default App;

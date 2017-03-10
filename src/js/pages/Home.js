import React from 'react';
import { Link } from 'react-router';
import werewolfService from '../services/werewolf';

import Header from '../components/Header';

export default class Home extends React.Component {
  constructor(){
    super();
  }

  onPlayersChanged(event) {
    this.props.setPlayers({value: event.target.value});
  }
  
  render() {
    const decks = Object.keys(werewolfService.getDecks());
    const options = decks.map((e, i) => <option value={e} key={i}>{e}</option> );

    return (
    <div>
      <Header name="Home" />
      <div class="col-md-4 col-md-offset-4">
        <div class="panel panel-default">
          <div class="panel-body">
            <form class="form-horizontal">
              <div class="form-group col-md-12">
                <label class="control-label" for="players">Players</label>
                <input name="players" type="number" class="form-control input-md" placeholder="0" min="0" value={this.props.manin.players} onChange={this.onPlayersChanged.bind(this)} />
              </div>
              <div class="form-group col-md-12">
                <label class="control-label" for="deck">Deck</label>
                <div class="">
                  <select id="deck" name="deck" class="form-control">
                    {options}
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div class="panel-footer">
            <div class="col-md-12">
              <Link to="cards" className="btn btn-success btn-block">Next  <i class="fa fa-arrow-right" aria-hidden="true"></i></Link>
            </div>
            <hr />
            <div class="col-md-12">
              <Link to={{pathname:"game", query:{type: "chaos"} }} className="btn btn-default col-md-4 pull-left"><i class="fa fa-arrows" aria-hidden="true"></i> Quick Chaos</Link>
              <Link to={{pathname:"game", query:{type: "balanced"} }} className="btn btn-default col-md-4 pull-right"><i class="fa fa-balance-scale" aria-hidden="true"></i> Quick Balanced</Link>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
</div>
);
  }
}
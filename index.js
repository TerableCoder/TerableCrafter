String.prototype.clr = function (hexColor){ return `<font color='#${hexColor}'>${this}</font>` };
module.exports = function TerableCrafter(mod) {
  let petInfo = 0n,
    cycle = false,
    timeout;
  mod.command.add(['terac', 'tcraft'], {
    $none() {
      if (!petInfo) return;
      mod.send('C_START_SERVANT_ACTIVE_SKILL', 1, {
        gameId: petInfo.gameId,
        id: 5024
      });
    },
    cycle(){
      if(petInfo){
        cycle = !cycle;
        mod.command.message(`Cycling TCraft is now ${cycle ? "enabled".clr("00FF00") : "disabled".clr("FF0000")}.`);
        clearInterval(timeout);
        if(!cycle) return;
        mod.send('C_START_SERVANT_ACTIVE_SKILL', 1, {
          gameId: petInfo.gameId,
          id: 5024
        });
    		timeout = setInterval(() => {
          if(petInfo){
            mod.send('C_START_SERVANT_ACTIVE_SKILL', 1, {
              gameId: petInfo.gameId,
              id: 5024
            });
          }
    		}, 270000); // reapply every 4.5 mins
      } else{
        cycle = false;
        mod.command.message(`No servant spawned. Cycling TCraft Disabled`.clr("FF0000"));
      }
    }
  });

  mod.hook('S_REQUEST_SPAWN_SERVANT', 1, event => {
    if (mod.game.me.is(event.ownerId)) {
      petInfo = event;
    }
  });

  mod.hook('S_REQUEST_DESPAWN_SERVANT', 1, event => {
    if (petInfo && petInfo.gameId == event.gameId) {
      petInfo = null;
    }
  });
};

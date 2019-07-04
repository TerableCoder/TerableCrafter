module.exports = function TerableCrafter(mod) {
  let petInfo = 0n;
  mod.command.add(['terac', 'tcraft'], {
    $default() {
      if (!petInfo) return;
      mod.send('C_START_SERVANT_ACTIVE_SKILL', 1, {
        gameId: petInfo.gameId,
        id: 5024
      });
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

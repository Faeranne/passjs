let graphene = require("graphene-pk11")
let Module = graphene.Module
let mod = Module.load("/usr/lib/x86_64-linux-gnu/softhsm/libsofthsm2.so")
mod.initialize()
var slot = mod.getSlots(0);
if (slot.flags & graphene.SlotFlag.TOKEN_PRESENT) {
  var session = slot.open();
  session.login("1234")

  var k = session.generateKey(graphene.KeyGenMechanism.AES, {
    "class": graphene.ObjectClass.SECRET_KEY,
    "token": false,
    "valueLen": 256/8,
    "keyType": graphene.KeyType.AES,
    "label": "My AES secret key",
    "private": true
  });
  console.log("Key.handle:", k.handle);
  console.log("key.type:", graphene.KeyType[k.type]);
  session.logout();
  session.close();
}else{
  console.error("Slot is not initialized");
}
mod.finalize();

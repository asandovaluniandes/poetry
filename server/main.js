import { Meteor } from 'meteor/meteor';
import '../imports/api/poems.js';
import '../imports/api/messages.js';

if(Meteor.isServer){
    SyncedCron.config({
        collectionName: 'historialCron'
    });

    SyncedCron.add({
        name: 'Definir posiciones',
        schedule: function(parser) {
            return parser.text('at 0:00 am');
            //return parser.text('every 3 minutes');
        },
        job: function(intendedAt) {

            var usuarios = Meteor.users.find({}, { sort: { puntaje: -1 } }).fetch();

            usuarios.forEach(function posicion(user,i) {
                Meteor.users.update(user._id, { $push: { "positions": i } });
            });

            Meteor.users.update({}, {$set: {"puntaje": 0}},{ multi: true });
        }
    });
}


Meteor.startup(() => {
  // code to run on server at startup
    SyncedCron.start();
});

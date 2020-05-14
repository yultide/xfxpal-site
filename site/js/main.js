$(function() {

    var card = $("#template");
    var cards = $('#cards');
    card.hide();

    $.getJSON('/data/profiles.json', function(data) {
        if (data) {
            // data.profiles.forEach(function(url) {

            var promises = data.profiles.map(function(url) {
                return fetch(url);
            });
            Promise.all(promises)
                .then(function(responses) {
                    return Promise.all(responses.map(function(r) {
                        return r.json();
                    }));
                })
                .then(function(profiles) {
                for (var i = 0; i < profiles.length; i++) {
                    var profile = profiles[i];
                    var c = card.clone();
                    c.show();
                    c.attr('id', null);

                    profile.summary = profile.summary.join('\n');
                    profile.remote_relocate = ''

                    if (profile.relocate && profile.remote) {
                        profile.remote_relocate = '(Open to remote & relocate)'
                    } else if (profile.relocate) {
                        profile.remote_relocate = '(Open to relocate)'
                    } else if (profile.remote) {
                        profile.remote_relocate = '(Open to remote)'
                    }

                    c.find('.profile-name').html(profile.name);
                    c.find('.profile-title').html(profile.title)
                    c.find('.profile-location').html(profile.location)
                    c.find('.profile-relocation').html(profile.relocate)
                    c.find('.profile-pic').css('background-image', 'url(' + profile.picture + ')');
                    if (profile.linkedin)
                        c.find('.profile-linkedin').attr('href', profile.linkedin);
                    else
                        c.find('.profile-linkedin').remove()

                    if (profile.website)
                        c.find('.profile-website').attr('href', profile.website);
                    else
                        c.find('.profile-website').remove()

                    if (profile.resume)
                        c.find('.profile-resume').attr('href', profile.resume);
                    else
                        c.find('.profile-resume').remove()

                    c.find('.profile-summary').html(profile.summary);
                    cards.append(c);
                }
            });
        }
    })
});
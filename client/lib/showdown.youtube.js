var ytRegex = '\\^\\^yt\\s(?:https?://)?www\\.youtube\\.com/watch\\?\\S*v=([^\\s&]+)\\S*';

var ShowdownYoutubeEmbed = function(converter) {
    return [{
        type: 'lang',
        regex: ytRegex,
        replace: function (match, videoId) {
            return '<iframe id="ytplayer" type="text/html" width="640" height="390"' +
                'src="http://www.youtube.com/embed/' + videoId + '" frameborder="0"/>';
        }
    }];
};

var ShowdownYoutubeLink = function(converter) {
    return [{
        type: 'lang',
        regex: ytRegex,
        replace: function (match, videoId) {
            return '<a href="http://www.youtube.com/watch?v=' + videoId + '" target="_blank">(Video)</a>';
        }
    }];
};

Showdown.extensions['youtube.embed'] = ShowdownYoutubeEmbed;
Showdown.extensions['youtube.link'] = ShowdownYoutubeLink;
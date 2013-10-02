//CodeMirror instance singleton
var cm;

Template.postEditor.created = function () {
    //Edit mode
    if (this.data._id) {
        Session.set("postDraft", this.data.content);
    }
    //Add mdode
    else {
        Session.set("postDraft", "");
    }
};

Template.postEditor.events({
    "click .post-editor-save": function (event, template){
        var postContent = Session.get("postDraft");

        if (this._id) {
            Posts.edit(this._id, postContent);
        }
        else {
            Posts.save(postContent);
        }

        Router.go("adminPostList");
    }
});

Template.postEditorCodeMirror.rendered = function () {
    cm = CodeMirror(this.firstNode, {
      value: Session.get("postDraft") || "",
      mode:  "markdown"
    });

    cm.focus();

    cm.on("change", function(){
        Session.set("postDraft", cm.getValue());
    });
};

Template.postEditorCodeMirror.destroyed = function () {
    cm = null;
};

var converter = new Showdown.converter({ extensions: ['youtube.link']});

Template.postEditorPreview.helpers({
    "postPreview": function(){
        return new Handlebars.SafeString(converter.makeHtml(Session.get("postDraft")));
    }
});


//CodeMirror instance singleton
var cm;

Template.postEditor.created = function () {
    //Edit mode
    if (this.data._id) {
        Session.set("postDraft", this.data.content);
    }
    //Add mode
    else {
        Session.set("postDraft", i18n("admin.posts.editor.hint"));
    }
};

Template.postEditor.events({
    "click .post-editor-save": function (event, template) {
        var postTitle = template.find("#post-editor-title").value;
        var postDraft = Session.get("postDraft");

        var checkErr = function (err) {
            if (err) {
                Session.set("posts.editor.error", "admin.posts.editor.error")
            }
            else {
                Session.set("posts.editor.error", null)
                Router.go("adminPostList");
            }
        }

        if (postTitle === "" || postDraft === "") {
            checkErr(true);
        }

        var newPost = {title: postTitle, content: postDraft};
        if (this._id) {
            Meteor.call("post.edit", this._id, newPost, checkErr);
        }
        else {
            Meteor.call("post.save", newPost, checkErr);
        }
    }
});

Template.postEditorCodeMirror.rendered = function () {
    cm = CodeMirror(this.firstNode, {
      value: Session.get("postDraft"),
      mode: "markdown",
      lineWrapping: true
    });

    cm.on("change", function(){
        Session.set("postDraft", cm.getValue());
    });

    cm.on("drop", function(instance, event){
        event.preventDefault();
    });
};

Template.postEditorCodeMirror.destroyed = function () {
    cm = null;
};


Template.postEditorCodeMirror.events({
    "dragover": function (event, template) {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    },
    "dragenter": function (event, template) {
        $(template.firstNode).addClass("dragging");
    },
    "dragleave": function (event, template) {
        $(template.firstNode).removeClass("dragging");
    },
    "drop": function (event, template) {
        event.stopPropagation();
        event.preventDefault();

        var file = event.dataTransfer.files[0];

        if (file.type.indexOf("image") !== 0) {
            return;
        }

        Blog.smartfile.upload(file, {path: "uploads"}, function(err, path){
            if (err) {
                //XXX: proper user feedback ?
                console.log(err);
                return;
            }

            var publicPath = Blog.smartfile.resolvePublic(path);
            cm.replaceRange("![" + file.name + "](" + publicPath + ")", cm.getCursor());
        });
    }
});

var converter = new Showdown.converter({ extensions: ['youtube.link', 'autolink']});

Template.postEditorPreview.helpers({
    "postPreview": function () {
        return new Handlebars.SafeString(converter.makeHtml(Session.get("postDraft")|| ""));
    }
});

Template.postEditorError.helpers({
    "error": function () {
        return Session.get("posts.editor.error");
    }
})
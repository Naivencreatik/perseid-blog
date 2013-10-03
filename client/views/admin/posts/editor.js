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
      mode: "markdown",
      lineWrapping: true
    });

    cm.focus();

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

        SmartFile.upload(file, "uploads", function(err, uploadPath){
            if (err) {
                //XXX: proper user feedback ?
                console.log(err);
                return;
            }

            cm.replaceRange("![" + file.name + "](" + uploadPath + ")", cm.getCursor());
        });
    }
});

var converter = new Showdown.converter({ extensions: ['youtube.link', 'autolink']});

Template.postEditorPreview.helpers({
    "postPreview": function(){
        return new Handlebars.SafeString(converter.makeHtml(Session.get("postDraft")));
    }
});


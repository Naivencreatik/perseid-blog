var cm;

Template.postEditor.events({
    "click .post-editor-save": function (event, template){
        Posts.save(Session.get("postDraftRaw"));
        cm.setValue("");
        cm.clearHistory();
    }
});

Template.postEditorCodeMirror.rendered = function () {
    cm = CodeMirror(this.firstNode, {
      value: Session.get("postDraftRaw") || "",
      mode:  "markdown"
    });

    cm.focus();

    cm.on("change", function(){
        Session.set("postDraftRaw", cm.getValue());
    });
};

Template.postEditorCodeMirror.destroyed = function () {
    cm = null;
};

Template.postEditorPreview.helpers({
    "postDraftRaw": function(){
        return Session.get("postDraftRaw");
    }
});
Template.postEditor.rendered = function () {
    if (this._epicEditor) {
        this._epicEditor.unload();
    }

    this._epicEditor = new EpicEditor({
        container: this.find(".epic-editor"),
        basePath: '/epiceditor/',
        theme: {
            base:    'epiceditor.css',
            preview: 'preview-dark.css',
            editor:  'epic-dark.css'
        },
    }).load();
};

Template.postEditor.destroyed = function () {
    this._epicEditor.unload();
};

Template.postEditor.events({
    "click .post-editor-save": function (event, template){
        Posts.save(template._epicEditor.exportFile());
        template._epicEditor.importFile('');
    }
});
var strVar = "<div>";
strVar += "<button class=\"uk-width-1-1 uk-button\" v-on:click.prevent=\"openOverlay\">Open Markdown Editor<\/button>  ";
strVar += "<div class=\"overlay\" :class=\"{'overlay--open': open}\">";
strVar += "  <div class=\"overlay__inner\">";
strVar += "    <div class=\"uk-clearfix\">";
strVar += "      <div class=\"uk-float-right\">";
strVar += "        <a v-on:click=\"close\" class=\"uk-button\"><i class=\"uk-icon-close\"><\/i> Ready<\/a>";
strVar += "      <\/div>";
strVar += "      <h1 class=\"overlay__headline\">Markdown Editor<\/h1>";
strVar += "    <\/div>";
strVar += "    <div class=\"overlay__list\">";
strVar += "      <div class=\"uk-grid\">";
strVar += "        <div class=\"uk-width-1-1\">";
strVar += "          <textarea v-model=\"model\" class=\"simplemde_editor uk-width-1-1\" style=\"height: calc(100vh - 130px)\" debounce=\"300\"><\/textarea>";
strVar += "        <\/div>";
strVar += "      <\/div>";
strVar += "    <\/div>";
strVar += "  <\/div>";
strVar += "<\/div>";
strVar += "<\/div>";

module.exports = {
    watch: {
        'model': {
            handler: function(value) {
                this.$emit('changed-model', value);
            },
            deep: true
        }
    },
    template: strVar,
    data: function data() {
        return {
            open: false
        };
    },
    created: function() {
        if (!jQuery('#simplemde_css').length) {
            jQuery('head').append(jQuery('<link rel="stylesheet" id="simplemde_css" type="text/css" />').attr('href', 'https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css'));
        }
        jQuery.getScript('https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.js', this.initEditor.bind(this))
    },
    destroyed: function() {
      this.simplemde.toTextArea();
      this.simplemde = null;
    },
    props: ['model'],
    methods: {
        initEditor: function() {
            if (!this.model) {
                this.model = ''
            }

            this.simplemde = new SimpleMDE({
                element: jQuery(this.$el).find(".simplemde_editor")[0],
                spellChecker: false,
                forceSync: true
            });
        },
        close: function close() {
            this.open = false;
        },
        openOverlay: function openOverlay() {
            this.open = true;
        }
    }
};

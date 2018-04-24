<template>
  <div class="document-editor">
    <div class="document-editor__toolbar"></div>
    <div class="document-editor__editable-container">
      <div class="document-editor__editable">
        <h2>Sample</h2>
        <p>This is an instance of the
          <a href="https://docs.ckeditor.com/ckeditor5/latest/builds/guides/overview.html#document-editor">document editor build</a>.</p>
        <figure class="image">
          <img :src="sample" alt="Autumn fields" />
        </figure>
        <p>You can use this sample to validate whether your
          <a href="https://docs.ckeditor.com/ckeditor5/latest/builds/guides/development/custom-builds.html">custom build</a> works fine.</p>
      </div>
    </div>
  </div>
</template>

<script>
import DecoupledEditor from '@/components/CKEditor'
import sample from '@/assets/img/sample.jpg'

export default {
  data() {
    return {
      sample
    }
  },
  mounted() {
    DecoupledEditor.create(
      document.querySelector('.document-editor__editable'),
      {
        cloudServices: {
          tokenUrl: 'http://localhost:8889/image/upload',
          uploadUrl: 'http://localhost:8889/image/upload'
        }
      }
    )
      .then(editor => {
        const toolbarContainer = document.querySelector(
          '.document-editor__toolbar'
        )

        toolbarContainer.appendChild(editor.ui.view.toolbar.element)

        window.editor = editor
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>

<style>
.document-editor {
  position: relative;
  height: 100%;
  border: 1px solid var(--ck-color-base-border);
  border-radius: var(--ck-border-radius);

  /* This element is a flex container for easier rendering. */
  display: flex;
  flex-flow: column nowrap;
}

.document-editor__toolbar {
  /* Make sure the toolbar container is always above the editable. */
  z-index: 1000;

  /* Create the illusion of the toolbar floating over the editable. */
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.2);

  /* Use the CKEditor CSS variables to keep the UI consistent. */
  border-bottom: 1px solid var(--ck-color-toolbar-border);
}

/* Adjust the look of the toolbar inside the container. */
.document-editor__toolbar .ck-toolbar {
  border: 0;
  border-radius: 0;
}

.document-editor__editable-wrapper {
  height: 100%;
  overflow-y: scroll;
}

/* Make the editable container look like the inside of a native word processor application. */
.document-editor__editable-container {
  height: 100%;
  padding: calc(2 * var(--ck-spacing-large));
  background: var(--ck-color-base-foreground);

  /* Make it possible to scroll the "page" of the edited content. */
  overflow-y: scroll;
}

.document-editor__editable {
  display: table;
  overflow: hidden !important;
  min-height: 22cm;
}

.document-editor__editable-container .ck-editor__editable {
  /* Set the dimensions of the "page". */
  height: 100%;
  width: 100%;
  max-width: 15.8cm;

  /* Keep the "page" off the boundaries of the container. */
  padding: 1cm 2cm 2cm;

  border: 1px hsl(0, 0%, 82.7%) solid;
  border-radius: var(--ck-border-radius);
  background: white;

  /* The "page" should cast a slight shadow (3D illusion). */
  box-shadow: 0 0 5px hsla(0, 0%, 0%, 0.1);

  /* Center the "page". */
  margin: 0 auto;
}

/* Set the default font for the "page" of the content. */
.document-editor .ck-content,
.document-editor .ck-heading-dropdown .ck-list {
  font: 16px/1.6 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

/* Adjust the headings dropdown to host some larger heading styles. */
.document-editor
  .ck-heading-dropdown
  .ck-dropdown__panel
  .ck-list
  > .ck-list__item {
  line-height: calc(
    1.2 * var(--ck-line-height-base) * var(--ck-font-size-base)
  );
  min-width: 8em;
}

/* Set the styles for "Heading 1". */
.document-editor .ck-content h2,
.document-editor .ck-heading-dropdown .ck-heading_heading1 {
  font-size: 2.18em;
}

.document-editor .ck-content h2 {
  line-height: 1.37em;
  padding-top: 0.342em;
  margin-bottom: 0.142em;
}

/* Set the styles for "Heading 2". */
.document-editor .ck-content h3,
.document-editor .ck-heading-dropdown .ck-heading_heading2 {
  font-size: 1.75em;
  color: hsl(203, 100%, 50%);
}

.document-editor
  .ck-heading-dropdown
  .ck-heading_heading2.ck-list__item_active {
  color: var(--ck-color-list-item-text-active);
}

/* Set the styles for "Heading 2". */
.document-editor .ck-content h3 {
  line-height: 1.86em;
  padding-top: 0.171em;
  margin-bottom: 0.357em;
}

/* Set the styles for "Heading 3". */
.document-editor .ck-content h4,
.document-editor .ck-heading-dropdown .ck-heading_heading3 {
  font-size: 1.31em;
}

.document-editor .ck-content h4 {
  line-height: 1.24em;
  padding-top: 0.286em;
  margin-bottom: 0.952em;
}

/* Set the styles for "Paragraph". */
.document-editor .ck-content p,
.document-editor .ck-heading-dropdown .ck-heading_paragraph {
  font-size: 1em;
}

.document-editor .ck-content p {
  line-height: 1.63em;
  padding-top: 0.5em;
  margin-bottom: 1.13em;
}

/* Make the block quoted text serif with some additional spacing. */
.document-editor .ck-content blockquote {
  font-family: Georgia, serif;
  margin-left: calc(2 * var(--ck-spacing-large));
  margin-right: calc(2 * var(--ck-spacing-large));
}
</style>


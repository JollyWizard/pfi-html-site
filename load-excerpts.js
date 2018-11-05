function fetchExcerpts(callback) {
  let dir_url='excerpts.htm'
  $.get(dir_url, {
    crossOrigin : true
  }, (data) => {

    /* Trim out replacement character � */
    data = data.replace(/\uFFFD/g, '')

    let html = $.parseHTML($.trim(data))

    // Convert back to jquery from parsed array (for multiple transforms)
    html = $(html)

    //Unwrap preprocessed sections.
    html = html.filter('.excerpt')

    callback( html )
  }, 'html')
}

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

    $('h1', html).remove()

    $('*[style] , *[class]', html).removeAttr('style').removeAttr('class')

    $(':contains(Session)', html).before('<hr />')

    callback( html )
  }, 'html')
}

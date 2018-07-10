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

    $('p:contains(Session)', html)
      .css('filter', 'hue-rotate(90deg)')
      .before('<hr />')

    $('p:contains(Q:)', html).css('filter','hue-rotate(180deg)')

    callback( html )
  }, 'html')
}

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

    //Unwrap from Word export wrapper elements.
    html = html.filter('div').children('p')

    // Remove Word css styling
    html.children().addBack().filter('[class]').removeAttr('class')
    html.find('span').replaceWith(function() { return this.innerHTML })
    html.find('[style]').removeAttr('style')

    html.filter('p:contains(Session)')
      .addClass('session-id')

    html = html.filter('.session-id')
      .map( function (index, element) {
        const group = $(element).nextUntil('.session-id').addBack()
        const wrapper = $('<div />', {class: 'excerpt'})
        wrapper.append(group)
        return wrapper.get()
      })

    html.filter('p:contains(Q:)')
      .addClass('question')

    callback( html )
  }, 'html')
}

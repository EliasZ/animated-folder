$(function() {
    var folder = $('#main .folder'),
        front = folder.find('.front'),
        contents_container = $('.folder-contents'),
        img = $('#main img'),
        droppedCount = 0,
        isDragging = false,
        hoveringOnContentsContainer = false;

    img.draggable({
        revert: 'invalid'
    });

    folder.droppable({
        accept: '#main img',
        
        drop: function(event, ui) {
            // Move the dragged icon to .folder-contents
            ui.draggable.appendTo(contents_container)
                        .draggable('disable')
                        .removeAttr('style')
                        .css('opacity', 1);
            
            // update the counter
            front.text(++droppedCount);
        },
        
        activate: function(event, ui) {
            isDragging = true;
            folder.addClass('open');
        },
        
        deactivate: function() {
            isDragging = false;
            folder.removeClass('open');
        }
    }).hover(
        // handlerIn
        function() {
            folder.addClass('open');
            
            if (!isDragging)
                contents_container.fadeIn();
        }, 
        
        // handlerOut
        function() {
            folder.removeClass('open');
            
            if (!isDragging && !hoveringOnContentsContainer)
                contents_container.fadeOut();
        }
    );
    
    contents_container.hover(
        function()
        {
            hoveringOnContentsContainer = true;
            contents_container.stop().fadeIn();
        },
        
        function()
        {
            hoveringOnContentsContainer = false;
            contents_container.fadeOut();
        }
    );
});
entries = new Entries();
entriesView = new EntriesView({collection: entries});
console.log(entries);

(function ($) {
    "use strict";

    $(document).ready(function(){

        // On the home page, move the blog icon inside the header 
        // for better relative/absolute positioning.

        //$("#blog-logo").prependTo("#site-head-content");


          // Target your .container, .wrapper, .post, etc.
            $(".content").fitVids();

          // Target your .container, .wrapper, .post, etc.
            $(".content").fitVids();

    });

}(jQuery));


/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
        var disqus_shortname = 'marshallzblog'; // required: replace wakeghost with your forum shortname

        /* * * DON'T EDIT BELOW THIS LINE * * */
        (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
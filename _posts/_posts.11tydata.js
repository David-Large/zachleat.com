function convertYouTubeUrlToImageUrl(url) {
	if(url.startsWith("https://www.youtube.com/watch?v=")) {
		let [, youtubeId] = url.split("https://www.youtube.com/watch?v=");
		// return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
		return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
	}
}

module.exports = {
	author: "Zach Leatherman",
	layout: "layouts/post.liquid",
	permalink: "/web/{{ page.fileSlug }}/",
	eleventyComputed: {
		seo: {
			openGraphBackgroundImage: function(data) {
				if(data.seo && data.seo.openGraphBackgroundImage) {
					return data.seo.openGraphBackgroundImage;
				}
				if(data.external_url && data.external_url.startsWith("https://www.youtube.com/watch?v=")) {
					return convertYouTubeUrlToImageUrl(data.external_url);
				}
				if(data.metadata && data.metadata.youtubeId) {
					return convertYouTubeUrlToImageUrl(`https://www.youtube.com/watch?v=${data.metadata.youtubeId}`);
				}
			}
		}
	}
}
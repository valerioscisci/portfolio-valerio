class Instagram {
  static async getFeed(username) {
    const INSTAGRAM_ID = '4096919577';
    const PHOTO_COUNT = 12;

    const mapMedia = (json) => {
      try {
        const thumbnailIndex = (node) => {
          node.thumbnail_resources.forEach((item, index) => {
            if (item.config_width === 640) {
              return index;
            }
          });

          return 4; // MAGIC
        };

        const url = (node) => {
          return 'https://www.instagram.com/p/' + node.shortcode;
        };

        const src = (node) => {
          switch (node.__typename) {
            case 'GraphVideo':
              return node.thumbnail_src;
            case 'GraphSidecar':
            default:
              return node.thumbnail_resources[thumbnailIndex(node)].src;
          }
        };

        const alt = (node) => {
          if (
            node.edge_media_to_caption.edges[0] &&
            node.edge_media_to_caption.edges[0].node
          ) {
            return node.edge_media_to_caption.edges[0].node.text;
          } else if (node.accessibility_caption) {
            return node.accessibility_caption;
          } else {
            return '';
          }
        };

        const edges = json.data.user.edge_owner_to_timeline_media.edges;

        return edges.map((edge) => {
          return {
            accessibilityCaption: alt(edge.node),
            caption: alt(edge.node),
            commentsNumber: edge.node.edge_media_to_comment.count,
            dimensions: edge.node.dimensions,
            displayImage: src(edge.node),
            id: edge.node.id,
            likes: edge.node.edge_media_preview_like.count,
            postLink: url(edge.node),
            thumbnail: src(edge.node),
          };
        });
      } catch (err) {
        throw Error(err);
      }
    };

    const url = `https://www.instagram.com/graphql/query?query_id=17888483320059182&variables={"id":"${INSTAGRAM_ID}","first":${PHOTO_COUNT},"after":null}`;

    return fetch(url)
      .then((resp) => resp.json())
      .then((json) => mapMedia(json));
  }
}

export default Instagram;

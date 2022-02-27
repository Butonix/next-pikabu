import { CommentDocument } from "@shared/types/documents";
import mongoose from "mongoose";

export function createCommentTree(
  list: (CommentDocument & {
    _id: mongoose.Types.ObjectId;
    children?: any;
  })[]
) {
  // console.log(typeof list[0]._id);
  var map: any = {},
    node,
    roots = [],
    i;
  for (i = 0; i < list.length; i += 1) {
    map[list[i]._id.toString()] = i; // initialize the map
    list[i].children = []; // initialize the children
  }

  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.parent_comment_id?.toString()) {
      // if you have dangling branches check that map[node.parent_comment_id] exists
      list[map[node.parent_comment_id.toString()]].children.push(node);
    } else {
      roots.push(node);
    }
  }
  // console.log(map);
  return roots;
}

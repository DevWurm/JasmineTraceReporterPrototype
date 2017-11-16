export function trace(tags: string | string[], spec: any) {
  spec.result.metadata = {tags: tags instanceof Array ? tags : [tags]};
}

import camelcase from './string/camelcase';
import lowercase from './string/lowercase';
import placeholder from './string/placeholder';
import pluralize from './string/pluralize';
import prettyBytes from './other/file/prettyBytes';
import reverse from './string/reverse';
import titlecase from './string/titlecase';
import truncate from './string/truncate';
import uppercase from './string/uppercase';

export default Vue => {
	camelcase(Vue);
	lowercase(Vue);
	placeholder(Vue);
	pluralize(Vue);
	prettyBytes(Vue);
	reverse(Vue);
	titlecase(Vue);
	truncate(Vue);
	uppercase(Vue);
};
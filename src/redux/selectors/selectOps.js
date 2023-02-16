import getOpKey from '../../utils/getOpKey';

// TODO-STOCKLY: optimize this using reselect for stockrow
export default function selectOps(state, scope, payload) {
	if (payload) {
		const opKey = getOpKey(scope, payload);
		return state.opsByKey[opKey];
	}
	const opKey = Object.keys(state.opsByKey).filter(key => key.startsWith(scope));
	return opKey.length > 0 ? state.opsByKey[opKey] : null;
}

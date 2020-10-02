const Logo = ({ logo }) => {
	return (
		<div className="flex justify-center">
			<div className="pa1 absolute bg-white w4 h4 ba b--light-silver br3" style={{ zIndex: '1', marginTop: '-74px' }}>
			  	<img
				    src={ logo }
				    className="br3 h-100 w-100" alt="logo"
				/>
			</div>
		</div>	
	);
};

export default Logo;
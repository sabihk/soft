<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Soft</title>

	<link href="{{ secure_asset('/css/app.css') }}" rel="stylesheet">
	<link href="{{ secure_asset('/plugins/datatables/css/jquery.dataTables.min.css') }}" rel="stylesheet">
	<link href="{{ secure_asset('/plugins/select2/select2.css') }}" rel="stylesheet">
	<link href="{{ secure_asset('/plugins/jquery-ui-1.11.2.custom/jquery-ui.css') }}" rel="stylesheet">

	<link href="{{ secure_asset('/css/items.css') }}" rel="stylesheet">

</head>
<body>
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle Navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Soft</a>
			</div>
		</div>
	</nav>

	@yield('content')
	<script src="{{ secure_asset('/scripts/jquery.min.js') }}"></script>
	<script src="{{ secure_asset('/scripts/bootstrap.min.js') }}"></script>
	<script src="{{ secure_asset('/plugins/datatables/js/jquery.dataTables.min.js') }}"></script>
	<script src="{{ secure_asset('/plugins/select2/select2.min.js') }}"></script>
	<script src="{{ secure_asset('/plugins/jquery-ui-1.11.2.custom/jquery-ui.js') }}"></script>

	<script>
		var base = "{{ secure_url('/') }}";
	</script>
	<script src="{{ secure_asset('/scripts/items.js') }}"></script>
</body>
</html>

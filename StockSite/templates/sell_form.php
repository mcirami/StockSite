<form action="sell.php" method="post">
    <fieldset>
        <div class="form-group">
            <select autofocus class="form-control" name="symbol">
                <option value=""> </option>
                <?php foreach($symbol as $symbols): ?>
                
                <option value='<?=$symbols["symbol"]?>'><?=$symbols["symbol"]?></option>
                
                <?php endforeach ?>
             </select>
        </div>     
        <div class="form-group">
            <button type="submit" class="btn btn-default">Sell</button>
        </div>
    </fieldset>
</form>
